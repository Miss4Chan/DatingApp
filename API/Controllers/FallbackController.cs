using System;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class FallbackController : Controller
{
    //za sekoj path shto ne go znaesh i ne mozhesh da go routenesh fall back to the index file aka angular routingot 
    public ActionResult Index()
    {
        return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(),"wwwroot","index.html"),"text/HTML");
    }
}
