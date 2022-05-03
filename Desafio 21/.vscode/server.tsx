//@deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";

const colors:any[] = [];

// USAR LA VERSION 1.18 DE DENO PORQUE CON LA VERSION ACTUAL NO FUNCIONA

const app = createApp();

app.post("/", async(req) => {
    const body = await req.formData();
    let color = body.value('color');

    colors.push(color);

    await req.redirect('/');
})

app.handle("/", async(req) => {
    await req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "text/html; charset=UTF-8",
        }),

        body: ReactDOMServer.renderToString(
            <html>
                <head>
                <meta charSet="utf-8" />
                <title>Servidor en Deno</title>
                </head>
                <body style={{backgroundColor: '#F7CC32'}}>
                <h1 style={{color: '#000', textAlign:"center", marginTop:50}}>Selecciona el color presionando en el cuadrado de color</h1>
                <form style={{width:200, margin:"auto", marginTop:50}} action="/" method="post">
                    <button style={{width:200, textAlign:"center"}}>Enviar</button>
                    <input style={{width:200, height:100}} type="color" name="color" />
                </form>
                <ul style={{textAlign:"center", marginTop:20, listStyle:"none", backgroundColor: '#fff'}}>
                {
                    colors.map( color =>
                    <li style={{color}}>
                        <b>{color}</b>
                    </li>)
                }
                </ul>
                </body>
            </html>
        ),
    });
});

app.listen({port: 8080})