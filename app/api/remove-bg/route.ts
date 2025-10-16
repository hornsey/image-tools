import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.REMOVE_BG_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "服务未配置 REMOVE_BG_API_KEY" }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return new Response(JSON.stringify({ error: "请求必须为 multipart/form-data" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const formData = await req.formData();
    const imageFile = formData.get("image_file");
    if (!imageFile || !(imageFile instanceof Blob)) {
      return new Response(JSON.stringify({ error: "缺少 image_file" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
    const size = (formData.get("size") as string) || "auto";

    const outForm = new FormData();
    outForm.append("image_file", imageFile);
    outForm.append("size", size);

    const resp = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
      },
      body: outForm,
    });

    if (!resp.ok) {
      let message = `remove.bg 调用失败（${resp.status}）`;
      try {
        const json = await resp.json();
        message = json?.errors?.[0]?.title || message;
      } catch {}
      return new Response(JSON.stringify({ error: message }), {
        status: resp.status,
        headers: { "content-type": "application/json" },
      });
    }

    const arrayBuffer = await resp.arrayBuffer();
    return new Response(arrayBuffer, {
      status: 200,
      headers: { "content-type": "image/png" },
    });
  } catch (e: unknown) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "未知错误" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}


