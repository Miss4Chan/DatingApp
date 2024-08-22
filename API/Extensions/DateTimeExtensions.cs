using System;

namespace API.Extensions;

public static class DateTimeExtensions
{
    public static int CalculateAge(this DateOnly dob)
    {
        var today = DateOnly.FromDateTime(DateTime.Now);
        var age = today.Year - dob.Year;
        if (dob > today.AddDays(-age)) age--; //ova e jako one line kako da vidish dali imale rodenden godinava i ako nemale age e one less
        return age; //To be noted -- this does not take into account leap years 
    }

}
