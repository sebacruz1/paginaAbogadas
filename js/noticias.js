async function fetchNews() {
  const title = document.querySelector('.title');
  try {
    // Correct PHP endpoint
    const response = await fetch('http://localhost:8000/news.php');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Check if results exist
    if (data.results && data.results.length > 0) {
      title.textContent = 'Últimas Noticias';
      displayNews(data.results); // Send 'results' array to displayNews
    } else {
      console.error('No news available');
      title.textContent = 'No hay noticias disponibles';
    }
  } catch (error) {
    title.textContent = 'No hay noticias disponibles';
    console.error('Error fetching news:', error);
  }
}

function displayNews(articles) {
  const newsContainer = document.getElementById('news-container');

  // Clear previous content
  newsContainer.innerHTML = '';

  // Loop through each article and display
  articles.forEach(article => {
    const articleElement = document.createElement('div');
    articleElement.classList.add('news-item');

    // Truncate description to 100 words
    let truncatedDescription = article.description
      ? article.description.split(' ').slice(0, 100).join(' ')
      : 'Descripción no disponible';
    if (article.description && article.description.split(' ').length > 100) {
      truncatedDescription += '...';
    }

    // Create HTML structure for news item
    articleElement.innerHTML = `
      <h2><a href="${article.link}" target="_blank">${article.title}</a></h2>
      <p>${truncatedDescription}</p>
      <p><small>${article.source_name || 'Fuente desconocida'} - 
        ${new Date(article.pubDate).toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        })}
      </small></p>
    `;

    // Append to news container
    newsContainer.appendChild(articleElement);
  });
}

// Call the function to fetch and display news
fetchNews();
