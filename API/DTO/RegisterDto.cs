using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTO;

public class RegisterDto
{
    //this one izlaga kako error koa praish request so prazni fields
    //chitni malce za ovie dve posho treba da imaat ista funkcija :()
    [Required]
    public string Username { get; set; } = string.Empty; //ova required e za compilerot mozhe i da mu daesh vrednost i ke kjuti

    [Required] public string? KnownAs { get; set; }
    [Required] public string? Gender { get; set; }
    [Required] public string? DateOfBirth { get; set; }
    [Required] public string? City { get; set; }
    [Required] public string? Country { get; set; }

    [Required]
    public string Password { get; set; } = string.Empty;
}
