using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Movie.INFARSTRUTURE;
using Movie.INFARSTRUTURE.Models.CinemaModel;
using Movie.INFARSTRUTURE.Models.FeedbackModel;
using Movie.INFARSTRUTURE.Utilities;
using Movie.SERVICES.Interfaces;
using Movie.SERVICES.Interfaces.IRepositories;

namespace Movie.SERVICES.Repositories
{
    public class FeebackRepository : GenericRipository<INFARSTRUTURE.Entities.Feedback>, IFeedbackRepository
    {
        private IMapper _mapper;
        public FeebackRepository(ApplicationDbContext context, IMapper mapper, IUnitOfWork unitOfWork) : base(context, unitOfWork)
        {
            _mapper = mapper;
        }

        public async Task<PageList<FeedbackResultVm>> GetListFeedbackByMovie(int page, int pageSize, int movieID)
        {
            var query = from feedback in _context.Feedbacks
                        join user in _context.Users on feedback.UserID equals user.Id
                        where feedback.MovieID == movieID
                        select new FeedbackResultVm
                        {
                            FeedbackID = feedback.FeedbackID,
                            Content = feedback.Content,
                            Rate = feedback.Rate,
                            MovieID = feedback.MovieID,
                            DateFeedback = feedback.DateFeedback,
                            UserName = user.UserName
                        };
            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);
            query = query.Skip((page - 1) * pageSize).Take(pageSize);
            var feedbacks = await query.ToListAsync();
            var resultItems = _mapper.Map<IEnumerable<FeedbackResultVm>>(feedbacks);
            var result = PageList<FeedbackResultVm>.Create(resultItems, page, pageSize, totalCount, totalPages);
            return result;

        }
    }
}
