using Movie.INFARSTRUTURE.Models.PostModel;
using Movie.INFARSTRUTURE.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.SERVICES.Interfaces.IRepositories
{
    public interface IPostRepository : IGenericRepository<INFARSTRUTURE.Entities.Post>
    {
        public Task<PageList<PostResultVm>> GetListPost(int page, int pageSize, string filter = "");
        public Task<IEnumerable<PostResultVm>> GetListPostLatest();
    }
}
