import { ImageResponse } from "next/og";

export const alt = "Ronaldo Delgado, Full Stack Developer y AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#06100e", color: "white", padding: "72px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#8cf2cf", fontSize: 24 }}>
        <span>RONALDO DELGADO</span><span>PORTAFOLIO</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 68, fontWeight: 700, letterSpacing: "-3px" }}>Full Stack Developer | AI Engineer</span>
        <span style={{ marginTop: 24, color: "#b8cbc4", fontSize: 30 }}>Aplicaciones web y móviles · APIs · Datos · Azure OpenAI</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#71857e", fontSize: 18 }}>
        <span>TypeScript · React · Node.js · .NET · PostgreSQL</span><span>Portafolio profesional</span>
      </div>
    </div>,
    size,
  );
}
