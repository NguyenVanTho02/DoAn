using AutoMapper;
using Microsoft.AspNetCore.SignalR.Protocol;
using Microsoft.EntityFrameworkCore;
using Movie.INFARSTRUTURE;
using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.ShowModel;
using Movie.INFARSTRUTURE.Utilities;
using Movie.SERVICES.Interfaces;
using Movie.SERVICES.Interfaces.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.SERVICES.Repositories
{
    public class ShowRepository : GenericRipository<INFARSTRUTURE.Entities.Show>, IShowRepository
    {
        private IMapper _mapper;
        public ShowRepository(ApplicationDbContext context, IMapper mapper, IUnitOfWork unitOfWork) : base(context, unitOfWork)
        {
            _mapper = mapper;
        }

        public async Task<ShowInfoResult> GetInfoShow(int showID)
        {
            try
            {
                var query = from show in _context.Shows
                            join movie in _context.Movies on show.MovieID equals movie.MovieID
                            join theater in _context.Theaters on show.TheaterID equals theater.TheaterID
                            join cinema in _context.Cinemas on theater.CinemaID equals cinema.CinemaID
                            join showseat in _context.ShowSeat on show.ShowID equals showseat.ShowID
                            join seat in _context.Seats on showseat.SeatID equals seat.SeatID
                            where show.ShowID == showID
                            select new
                            {
                                ShowID = show.ShowID,
                                ShowDate = show.ShowDate,
                                StartTime = show.StartTime,
                                EndTime = show.EndTime,
                                CinemaName = cinema.CinemaName,
                                TheaterName = theater.TheaterName,
                                CinemaAddress = cinema.CinemaAddress,
                                MovieName = movie.MovieName,
                                ShowSeatID = showseat.ShowSeatID,
                                SeatName = seat.SeatName,
                                SeatID = seat.SeatID,
                                SeatType = seat.SeatType,
                                SeatStatus = showseat.SeatStatus,
                                Price = showseat.Price
                            };
                var result = await query.ToListAsync();
                if (result.Count == 0)
                    return null;
                ShowInfoResult showInfoResult = new ShowInfoResult
                {
                    MovieInfo = new MovieInfomation
                    {
                        ShowID = result.First().ShowID,
                        ShowDate = result.First().ShowDate,
                        StartTime = result.First().StartTime,
                        EndTime = result.First().EndTime,
                        CinemaName = result.First().CinemaName,
                        TheaterName = result.First().TheaterName,
                        CinemaAddress = result.First().CinemaAddress,
                        MovieName = result.First().MovieName
                    },
                    listShowSeat = result.Select(r => new ShowSeatViewModel
                    {
                        ShowSeatID = r.ShowSeatID,
                        ShowID = r.ShowID,
                        SeatID = r.SeatID,
                        SeatName = r.SeatName,
                        SeatType = r.SeatType,
                        SeatStatus = r.SeatStatus,
                        Price = r.Price

                    }).ToList()
                };
                return showInfoResult;
            }
            catch (Exception ex)
            {
                return null;
            }


        }

        public async Task<PageList<ShowResultVm>> GetListShow(int page, int pageSize, string filter = "", int movieID = 0)
        {
            //var query = _context.Shows.AsQueryable();
            var query = (from s in _context.Shows
                         join m in _context.Movies
                         on s.MovieID equals m.MovieID
                         select new ShowResultVm
                         {
                             ShowID = s.ShowID,
                             ShowDate = s.ShowDate,
                             MovieName = m.MovieName,
                             MovieID = m.MovieID,
                             TheaterID = s.TheaterID,
                             StartTime = s.StartTime,
                             EndTime = s.EndTime
                         });

            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(s => s.ShowDate.Equals(filter));
            }

            if(movieID != 0)
            {
                query = query.Where(s => s.MovieID == movieID);
            }

            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);
            query = query.Skip((page - 1) * pageSize).Take(pageSize);
            var shows = await query.ToListAsync();
            var resultItems = _mapper.Map<IEnumerable<ShowResultVm>>(shows);
            var result = PageList<ShowResultVm>.Create(resultItems, page, pageSize, totalCount, totalPages);
            return result;

        }

        public async Task<IEnumerable<Show>> GetListShowByMovie(ShowByMovieVm showVm)
        {
            var today = DateTime.Today;
            var shows = await _context.Shows
                .Where(s => s.MovieID == showVm.movieID && s.ShowDate >= today && _context.Theaters.Any(t => t.TheaterID == s.TheaterID && t.CinemaID == showVm.cinemaID))
                .Select(s => new Show
                {
                    ShowID = s.ShowID,
                    ShowDate = s.ShowDate,
                    StartTime = s.StartTime,
                    EndTime = s.EndTime,
                    MovieID = s.MovieID,
                    TheaterID = s.TheaterID
                })
                .ToListAsync();

            return shows;
        }

        public async Task<IEnumerable<ShowByCinemaResult>> GetListMovieByCinema(int cinemaID,DateTime showDate)
        {
            try
            {
                var query = from movie in _context.Movies
                            join show in _context.Shows on movie.MovieID equals show.MovieID
                            join genre in _context.Genres on movie.GenreID equals genre.GenreID
                            join theater in _context.Theaters on show.TheaterID equals theater.TheaterID
                            join cinema in _context.Cinemas on theater.CinemaID equals cinema.CinemaID
                            where EF.Functions.DateDiffDay(show.ShowDate, showDate) == 0 && cinema.CinemaID == cinemaID
                            select new
                            {
                                movie.MovieID,
                                movie.MovieName,
                                movie.Duration,
                                genre.GenreName,
                                show.ShowID,
                                show.ShowDate,
                                show.StartTime,
                                show.EndTime,
                                movie.Poster

                            };
                var result = await query.ToListAsync();
                var groupedByMovie = result.GroupBy(x => new { x.MovieID, x.MovieName, x.Duration, x.GenreName,x.Poster })
                                    .Select(g => new ShowByCinemaResult
                                    {
                                        MovieID = g.Key.MovieID,
                                        MovieName = g.Key.MovieName,
                                        Duration = g.Key.Duration,
                                        GenreName = g.Key.GenreName,
                                        Poster = g.Key.Poster,
                                        ListShow = g.Select(s => new ShowTime
                                        {
                                            ShowID = s.ShowID,
                                            ShowDate = s.ShowDate,
                                            StartTime = s.StartTime,
                                            EndTime = s.EndTime
                                        }).ToList()
                                    }); ;

                return groupedByMovie;
            }
            catch (Exception ex)
            {
                return null;
            }

        }
    }
}
