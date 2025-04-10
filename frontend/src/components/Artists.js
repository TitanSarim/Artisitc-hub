import React, { useState, useEffect } from 'react';

// Sample Artist Data (Mock Data)
const sampleArtists = [
  {
    id: 1,
    name: "Jean-Michel Basquiat",
    bio: "A pioneering figure in the Neo-expressionism movement, Jean-Michel Basquiat's raw, graffiti-inspired artworks often reflect his complex, chaotic view of society.",
    imageUrl: "https://th.bing.com/th/id/OIP.J7of3ZyLbpq8PCT-K6R1gAHaF1?pid=ImgDet&w=500&h=500",
    portfolio: [
      "https://example.com/portfolio1.jpg", 
      "https://example.com/portfolio2.jpg", 
      "https://example.com/portfolio3.jpg"
    ]
  },
  {
    id: 2,
    name: "Frida Kahlo",
    bio: "A Mexican artist known for her deeply personal self-portraits, Frida Kahlo explored themes of identity, gender, class, and race in her work, often reflecting her struggles with physical and emotional pain.",
    imageUrl: "https://th.bing.com/th/id/OIP.D_MxjZnElT7FgQ96aQyPzQHaHa?pid=ImgDet&w=370&h=370",
    portfolio: [
      "https://example.com/portfolio1.jpg", 
      "https://example.com/portfolio2.jpg"
    ]
  },
  {
    id: 3,
    name: "Pablo Picasso",
    bio: "One of the most influential artists of the 20th century, Pablo Picasso revolutionized modern art with his unique approach to form and abstraction, co-founding the Cubist movement.",
    imageUrl: "https://th.bing.com/th/id/OIP.x3sB4S9xPLfLO2lqz7eowgHaKH?pid=ImgDet&w=362&h=362",
    portfolio: [
      "https://example.com/portfolio1.jpg", 
      "https://example.com/portfolio2.jpg"
    ]
  },
  {
    id: 4,
    name: "Yayoi Kusama",
    bio: "Japanese artist Yayoi Kusama is known for her obsessive use of polka dots and infinity nets, creating art that explores themes of repetition, self-obliteration, and the infinite.",
    imageUrl: "https://th.bing.com/th/id/OIP.Llx_Z4jsm_JPAcsLZqydJwHaHa?pid=ImgDet&w=400&h=400",
    portfolio: [
      "https://example.com/portfolio1.jpg",
      "https://example.com/portfolio2.jpg"
    ]
  },
  {
    id: 5,
    name: "Banksy",
    bio: "An anonymous England-based street artist, Banksy is known for his satirical and political graffiti that blends dark humor with powerful social commentary.",
    imageUrl: "https://th.bing.com/th/id/OIP.L8xIg8YxdR7US5X2D3QUPgHaLH?pid=ImgDet&w=500&h=500",
    portfolio: [
      "https://example.com/portfolio1.jpg", 
      "https://example.com/portfolio2.jpg"
    ]
  },
];

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      // Simulating a delay for API call or fetching real data
      setTimeout(() => {
        setArtists(sampleArtists);
        setLoading(false);
      }, 1000);
    };

    fetchArtists();
  }, []);

  // Follow toggle function
  const toggleFollow = (id) => {
    setArtists((prevArtists) =>
      prevArtists.map((artist) =>
        artist.id === id
          ? { ...artist, isFollowed: !artist.isFollowed }
          : artist
      )
    );
  };

  // Show portfolio function
  const showPortfolio = (id) => {
    setArtists((prevArtists) =>
      prevArtists.map((artist) =>
        artist.id === id
          ? { ...artist, isPortfolioVisible: !artist.isPortfolioVisible }
          : artist
      )
    );
  };

  if (loading) {
    return <div style={styles.loading}>Loading artists...</div>;
  }

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.pageTitle}>Featured Artists</h1>
      <div style={styles.artistGrid}>
        {artists.map((artist) => (
          <div key={artist.id} style={styles.artistCard}>
            <img
              src={artist.imageUrl}
              alt={artist.name}
              style={styles.artistImage}
            />
            <div style={styles.artistInfo}>
              <h3 style={styles.artistName}>{artist.name}</h3>
              <p style={styles.artistBio}>{artist.bio}</p>

              {/* Follow Button */}
              <button
                onClick={() => toggleFollow(artist.id)}
                style={{
                  ...styles.followButton,
                  backgroundColor: artist.isFollowed ? '#4a7225' : '#ccc',
                }}
              >
                {artist.isFollowed ? 'Following' : 'Follow'}
              </button>

              {/* Portfolio Button */}
              <button
                onClick={() => showPortfolio(artist.id)}
                style={styles.portfolioButton}
              >
                View Portfolio
              </button>

              {/* Portfolio Display */}
              {artist.isPortfolioVisible && (
                <div style={styles.portfolio}>
                  {artist.portfolio.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Portfolio image ${index + 1}`}
                      style={styles.portfolioImage}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artists;

// Styles for the page
const styles = {
  pageContainer: {
    padding: '40px 20px',
    backgroundColor: '#f7f7f7',
    textAlign: 'center',
  },
  pageTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#4a7225',
    marginBottom: '40px',
  },
  artistGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    justifyItems: 'center',
    marginTop: '20px',
  },
  artistCard: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer',
    position: 'relative',
    padding: '15px',
  },
  artistImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    objectFit: 'cover',
    marginBottom: '15px',
  },
  artistInfo: {
    paddingTop: '10px',
    textAlign: 'left',
  },
  artistName: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  artistBio: {
    fontSize: '1rem',
    color: '#777',
    marginBottom: '10px',
  },
  followButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  portfolioButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#4a7225',
    border: 'none',
    borderRadius: '5px',
    marginTop: '10px',
    cursor: 'pointer',
  },
  portfolio: {
    marginTop: '20px',
  },
  portfolioImage: {
    width: '100%',
    height: 'auto',
    marginBottom: '10px',
    borderRadius: '8px',
    objectFit: 'cover',
  },
  loading: {
    fontSize: '24px',
    color: '#333',
    textAlign: 'center',
  },
};
