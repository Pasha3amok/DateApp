using System;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles: Profile
{
	public AutoMapperProfiles()
	{
		CreateMap<AppUser, MemberDto>()
		.ForMember(destination => destination.Age,
			options => options.MapFrom(
				sourse => sourse.DateOfBirth.CalculateAge()))
			.ForMember(destination => destination.PhotoUrl,
						options => options.MapFrom(
							sourse => sourse.Photos.FirstOrDefault(
								x => x.IsMain
							)!.Url
						));
		CreateMap<Photo, PhotoDto>();
		CreateMap<MemberUpdateDto, AppUser>();
	}
}
