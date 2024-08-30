using System;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers;

public class LogUserActivity : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var resultContext = await next(); //shto i da napraime pred da se izvrshi next ke se izvrshi pred da projde actionot 
        //-- vo sluchajot nash toa se func vo controllerot 

        if(context.HttpContext.User.Identity?.IsAuthenticated != true) return;

        var userId = resultContext.HttpContext.User.GetUserId();
        var repository = resultContext.HttpContext.RequestServices.GetRequiredService<IUnitOfWork>();
        var user = await repository.UserRepository.GetUserByIdAsync(userId);

        if(user == null) return;

        user.LastActive = DateTime.UtcNow;
        await repository.Complete();
    }
}
