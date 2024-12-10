async function fetchNews() {
  try {
    const response = await fetch('http://localhost:3000/news');
    const title = document.querySelector('.title');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.length > 0) {
      displayNews(data);
    } else {
      console.error('No news available');
      title.textContent = 'No hay noticias disponibles'; // Update title to indicate no news
      return;
    }
  } catch (error) {
    console.error('Error fetching news:', error);
  }
}

function displayNews(articles) {
  const newsContainer = document.getElementById('news-container');



  newsContainer.innerHTML = '';
  
  title.textContent = 'Últimas Noticias';

  articles.forEach(article => {
      const articleElement = document.createElement('div');
      articleElement.classList.add('news-item');
      articleElement.innerHTML = `
          <h2><a href="${article.link}" target="_blank">${article.title}</a></h2>
          <p>${article.description}</p>
          <p><small>${article.source_name ? article.source_name : 'Fuente desconocida'} - ${new Date(article.pubDate).toLocaleDateString()}</small></p>
      `;
      newsContainer.appendChild(articleElement);
  });
}


fetchNews();