using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Movie.INFARSTRUTURE.Models.CinemaModel;
using Movie.INFARSTRUTURE.Models.FeedbackModel;
using Movie.INFARSTRUTURE.Utilities;

namespace Movie.SERVICES.Interfaces.IRepositories
{
    public interface IFeedbackRepository : IGenericRepository<INFARSTRUTURE.Entities.Feedback>
    {
        public Task<PageList<FeedbackResultVm>> GetListFeedbackByMovie(int page, int pageSize, int movieID);

    }
}
