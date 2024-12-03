async function fetchNews() {
  try {
    const response = await fetch('http://localhost:3000/news');
    const data = await response.json();

    if (data.length > 0) {
      displayNews(data);
    } else {
      console.error('No news available');
    }
  } catch (error) {
    console.error('Error fetching news:', error);
  }
}

function displayNews(articles) {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '';

  articles.forEach(article => {
    const articleElement = document.createElement('div');
    articleElement.classList.add('news-item');
    articleElement.innerHTML = `
        <h2><a href="${article.link}" target="_blank">${article.title}</a></h2>
        <p>${article.description}</p>
        <p><small>${article.source_name ? article.source_name : 'Unknown Source'} - ${new Date(article.pubDate).toLocaleDateString()}</small></p>
      `;
    newsContainer.appendChild(articleElement);
  });
}


fetchNews();