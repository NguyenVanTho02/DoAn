using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Movie.INFARSTRUTURE;
using Movie.INFARSTRUTURE.Models.PostModel;
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
    public class PostRepository : GenericRipository<INFARSTRUTURE.Entities.Post>, IPostRepository
    {
        private IMapper _mapper;
        public PostRepository(ApplicationDbContext context, IMapper mapper, IUnitOfWork unitOfWork) : base(context, unitOfWork) 
        {
            _mapper = mapper;
        }
        public async Task<PageList<PostResultVm>> GetListPost(int page, int pageSize, string filter = "")
        {
            var query = (from p in _context.Posts
                         join u in _context.Users on p.UserID equals u.Id
                         select new PostResultVm
                         {
                             PostID = p.PostID,
                             Title = p.Title,
                             ImagePoster = p.ImagePoster,
                             Content = p.Content,
                             UserID = u.Id,
                             UserName = u.UserName
                         });
                                
            if(!string.IsNullOrEmpty(filter))
            {
                query = query.Where(p => p.Title.Contains(filter));
            }
            var totalCount = query.Count();
            var totalPage = (int)Math.Ceiling((double)totalCount / pageSize);
            query = query.Skip((page - 1) * pageSize).Take(pageSize);
            var posts = await query.ToListAsync();
            var resultItems = _mapper.Map<IEnumerable<PostResultVm>>(posts);
            var result = PageList<PostResultVm>.Create(resultItems, page, pageSize, totalCount, totalPage);
            return result;
        }

        public async Task<IEnumerable<PostResultVm>> GetListPostLatest()
        {
            var latestPost = await _context.Posts.Take(7).ToListAsync();
            var result = _mapper.Map<IEnumerable<PostResultVm>>(latestPost);
            return result;
        }
    }
}
