using System;

namespace API.Entities;

public class AppUser
{
    //[Key] ako se vika razlichno od Id posho Id se podrazbira 
    public int Id { get; set; }
    public required string UserName { get; set; } //required ni treba za da ne mu daeme da e nullable 
}
