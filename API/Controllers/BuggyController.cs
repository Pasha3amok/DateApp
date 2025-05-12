using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class BuggyController(DataContext context) : BaseApiController
	{
		[Authorize]
		[HttpGet("auth")]
		public ActionResult<string> GetAuth()
		{
			return "secret";
		}
		[HttpGet("not-found")]
		public ActionResult<AppUser> GetNotFound()
		{
			var thing = context.Users.Find(-1);

			if (thing == null)
			{
				return NotFound();
			}

			return thing;
		}
		[HttpGet("server-error")]
		public ActionResult<AppUser> GetServerError()
		{
			var thing = context.Users.Find(-1) ?? throw new Exception("Something went wrong in the server side!");

			return thing;
		}
		[HttpGet("bad-request")]
		public ActionResult<AppUser> GetBadRequest()
		{

			return BadRequest("Something went wrong with your request!!!");
		}
    }
}
