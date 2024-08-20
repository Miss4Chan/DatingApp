using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTO;

public class RegisterDto
{
    [Required] //this one izlaga kako error koa praish request so prazni fields
    //chitni malce za ovie dve posho treba da imaat ista funkcija :()
    public required string Username { get; set; } //ova required e za compilerot 

    [Required]
    public required string Password { get; set; }
}
