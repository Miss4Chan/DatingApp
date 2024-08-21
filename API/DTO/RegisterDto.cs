using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTO;

public class RegisterDto
{
    //this one izlaga kako error koa praish request so prazni fields
    //chitni malce za ovie dve posho treba da imaat ista funkcija :()
    [Required]
    public string Username { get; set; } = string.Empty; //ova required e za compilerot mozhe i da mu daesh vrednost i ke kjuti

    [Required]
    public string Password { get; set; } = string.Empty;
}
