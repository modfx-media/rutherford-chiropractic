import { createHmac, timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
import { revalidateRankedBlog } from '@/lib/ranked/revalidate'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_AGE_SECONDS = 5 * 60
const CONTENT_EVENTS = new Set(['content.status_changed', 'content.created'])

function verifySignature(payload: string, signature: string | null, secret: string): boolean {
  if (!signature) return false
  const expected = `sha256=${createHmac('sha256', secret).update(payload).digest('hex')}`
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

function timestampFresh(header: string | null): boolean {
  if (!header) return false
  const ts = Number(header)
  if (!Number.isFinite(ts)) return false
  const unix = ts > 1e12 ? Math.floor(ts / 1000) : ts
  return Math.abs(Date.now() / 1000 - unix) <= MAX_AGE_SECONDS
}

export async function POST(request: Request) {
  const secret = process.env.RANKED_WEBHOOK_SECRET
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'Webhook not configured' }, { status: 503 })
  }

  const raw = await request.text()
  const signature = request.headers.get('x-webhook-signature')
  if (!verifySignature(raw, signature, secret)) {
    return NextResponse.json({ ok: false, error: 'Invalid signature' }, { status: 401 })
  }

  if (!timestampFresh(request.headers.get('x-webhook-timestamp'))) {
    return NextResponse.json({ ok: false, error: 'Stale timestamp' }, { status: 401 })
  }

  let event: string | undefined
  let projectId: string | undefined
  try {
    const body = JSON.parse(raw) as { event?: string; project_id?: string }
    event = body.event ?? request.headers.get('x-webhook-event') ?? undefined
    projectId = body.project_id
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const expectedProject = process.env.RANKED_PROJECT_ID
  if (expectedProject && projectId && projectId !== expectedProject) {
    return NextResponse.json({ ok: true, ignored: true, reason: 'other_project' })
  }

  if (!event || CONTENT_EVENTS.has(event)) {
    revalidateRankedBlog()
  }

  return NextResponse.json({ ok: true })
}
