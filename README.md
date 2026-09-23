# Rithani Saravanakumar — Portfolio

My interactive portfolio for presenting AI product engineering, full-stack software, machine-learning projects, experience, and the personal interests behind my work.

[View the live portfolio](https://rithanisk.vercel.app)

## Highlights

- Chapter-based personal and professional story.
- Experience and project case studies with measurable outcomes.
- Responsive interactions and motion design.
- Server-side portfolio assistant with optional ElevenLabs voice replies.

## Stack

Next.js, React, TypeScript/JavaScript, Tailwind CSS, Framer Motion, and Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Voice replies are optional. To enable them, create `.env.local`:

```bash
ELEVENLABS_API_KEY=your_key
ELEVENLABS_VOICE_ID=your_voice_id
ELEVENLABS_MODEL_ID=eleven_flash_v2_5
```

The API key is used only by the server route and is not sent to browser JavaScript.

## Production checks

```bash
npm run lint
npm run build
```

