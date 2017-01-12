using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using FXTracker.Interfaces.Repository;
using FXTracker.Repositories;

namespace FXTracker
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; }

        public Startup(IHostingEnvironment env)
        {
            // environment specific settings configuration
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var settings = Configuration.GetSection("AppSettings");

            // Add framework services.
            services.AddMvc();
            services.AddCors(corsOptions => corsOptions.AddPolicy("AllowAnyOrigin", builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()));
            services.Configure<AppSettings>(options => Configuration.GetSection(nameof(AppSettings)).Bind(options));
            services.AddSingleton<IFXRateRepository, FXRateRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            app.UseCors("AllowAnyOrigin");
            app.UseMvc();
        }
    }
}
