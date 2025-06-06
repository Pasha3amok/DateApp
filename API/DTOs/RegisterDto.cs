using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
	[MaxLength(100)]
	public string Username { get; set; }
	[StringLength(8, MinimumLength = 4)]
	public string Password { get; set; }
}
