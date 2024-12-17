async function fetchNews() {
  const title = document.querySelector('.title');
  try {
    const response = await fetch('https::/abogadasvregion.cl/news');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.length > 0) {
      title.textContent = 'Últimas Noticias';
      displayNews(data);
    } else {
      console.error('No news available');
      title.textContent = 'No hay noticias disponibles'; // Update title to indicate no news
      return;
    }
  } catch (error) {
    title.textContent = 'No hay noticias disponibles';
    console.error('Error fetching news:', error);

  }
}

function displayNews(articles) {
  const newsContainer = document.getElementById('news-container');

  newsContainer.innerHTML = '';

  articles.forEach(article => {
    const articleElement = document.createElement('div');
    articleElement.classList.add('news-item');
    let truncatedDescription = article.description.split(' ').slice(0, 100).join(' ');
    if (article.description.split(' ').length > 100) {
      truncatedDescription += '...';
    }
    articleElement.innerHTML = `
          <h2><a href="${article.link}" target="_blank">${article.title}</a></h2>
          <p>${truncatedDescription}</p>
          <p><small>${article.source_name ? article.source_name : 'Fuente desconocida'} - ${new Date(article.pubDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    })}</small></p>
      `;
    newsContainer.appendChild(articleElement);
  });
}


fetchNews();