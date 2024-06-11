using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Utilities
{
    public class PageList<T>
    {
        private PageList(IEnumerable<T> items, int currentPage, int pageSize, int totalCount, int totalPages)
        {
            Items = items;
            CurrentPage = currentPage;
            PageSize = pageSize;
            TotalCount = totalCount;
            TotalPages = totalPages;
        }
        public IEnumerable<T> Items { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public int TotalPages { get; set; }


        public static PageList<T> Create(IEnumerable<T> items, int currentPage, int pageSize, int totalCount, int totalPages)
        {
            return new PageList<T>(items, currentPage, pageSize, totalCount, totalPages);
        }
    }
}
