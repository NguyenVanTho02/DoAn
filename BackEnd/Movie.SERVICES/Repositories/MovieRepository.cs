using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Movie.INFARSTRUTURE;
using Movie.INFARSTRUTURE.Models.MovieModel;
using Movie.INFARSTRUTURE.Utilities;
using Movie.SERVICES.Interfaces;
using Movie.SERVICES.Interfaces.IRepositories;

namespace Movie.SERVICES.Repositories
{
    public class MovieRepository : GenericRipository<INFARSTRUTURE.Entities.Movie>, IMovieRepository
    {
        private IMapper _mapper;
        public MovieRepository(ApplicationDbContext context, IMapper mapper, IUnitOfWork unitOfWork) : base(context, unitOfWork)
        {
            _mapper = mapper;
        }

        public async Task<PageList<MovieResultVm>> GetListMovie(int page, int pageSize, string filter = "")
        {
            var query = _context.Movies.AsQueryable();
            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(mv => mv.MovieName.Contains(filter));
            }
            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);
            query = query.Skip((page - 1) * pageSize).Take(pageSize);
            var movies = await query.ToListAsync();
            var resultItems = _mapper.Map<IEnumerable<MovieResultVm>>(movies);
            var result = PageList<MovieResultVm>.Create(resultItems, page, pageSize, totalCount, totalPages);
            return result;
        }

        public async Task<bool> RemoveImage(string images)
        {
            string[] imageArr = images.Split(new[] { ';' }, StringSplitOptions.RemoveEmptyEntries);
            bool allDeleted = true;

            foreach (string image in imageArr)
            {
                try
                {
                    var path = "C:\\Movie\\MovieApi\\wwwroot" + image;
                    System.IO.File.Delete(path);
                }
                catch (Exception ex)
                {
                    allDeleted = false;
                }
            }

            return allDeleted;
        }

        public async Task<IEnumerable<Movie.INFARSTRUTURE.Entities.Movie>> GetListMovieShowNowOrCommingSoon(bool showNow, bool commingSoon)
        {
            var movies = await _context.Movies.Where(mv => mv.ShowNow == showNow && mv.CommingSoon == commingSoon).ToListAsync();
            return movies;
        }
    }
}
