using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Net.WebSockets;
using Microsoft.AspNetCore.Http;
using System.Threading;

namespace WebApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {            
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            app.UseWebSockets();

            app.Use(async (context, next) =>
            {
                if (context.Request.Path == "/ws")
                {
                    if (context.WebSockets.IsWebSocketRequest)
                    {
                        var webSocket = await context.WebSockets.AcceptWebSocketAsync();
                        HotReload(context, webSocket);
                        await Echo(context, webSocket);
                        
                    }
                    else
                    {
                        context.Response.StatusCode = 400;
                    }
                }
                else
                {
                    await next();
                }

            });
        }

        private System.IO.FileInfo _fileInfo = null;

        private async Task Echo(HttpContext context, WebSocket webSocket)
        {
            var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(new byte[1024 * 4]), CancellationToken.None);            

            while (!result.CloseStatus.HasValue)
            {
                await webSocket.SendAsync(new ArraySegment<byte>(new byte[1024 * 4], 0, result.Count), result.MessageType, result.EndOfMessage, CancellationToken.None);

                result = await webSocket.ReceiveAsync(new ArraySegment<byte>(new byte[1024 * 4]), CancellationToken.None);
            }
            await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
        }

        private void HotReload(HttpContext context, WebSocket webSocket)
        {
            var buffer = new byte[1024 * 4];      

            Task.Run(() =>
            {
                while (true)
                {
                    if (_fileInfo == null)
                    {
                        _fileInfo = new System.IO.FileInfo(@"C:\Users\Akira\Documents\GitHub\WebApp\WebApp\wwwroot\js\bundles\sample.bundled.js");
                    }

                    Thread.Sleep(1000);

                    var currentFileInfo = new System.IO.FileInfo(@"C:\Users\Akira\Documents\GitHub\WebApp\WebApp\wwwroot\js\bundles\sample.bundled.js");

                    if (_fileInfo.LastWriteTime.ToLongTimeString() != currentFileInfo.LastWriteTime.ToLongTimeString())
                    {                    
                        _fileInfo = currentFileInfo;                    
                        webSocket.SendAsync(new ArraySegment<byte>(buffer, 0, 1000), System.Net.WebSockets.WebSocketMessageType.Text, true, CancellationToken.None);
                    }           
                }   
            });
        }
    }
}

