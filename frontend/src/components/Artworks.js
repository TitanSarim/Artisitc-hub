import React, { useState, useEffect } from "react";

// Sample Digital Artwork Data (Mock Data)
const sampleArtworks = [
  {
    id: 1,
    title: "Digital Dreamscape",
    artist: "John Doe",
    year: "2022",
    description: "A vivid digital painting blending surreal and abstract elements.",
    imageUrl: "https://th.bing.com/th/id/OIP.Wm_UxK_R4SX4i9U4l7-y_AHaFW?rs=1&pid=ImgDetMain",
    price: "$150",
  },
  {
    id: 2,
    title: "Abstract Horizon",
    artist: "Jane Smith",
    year: "2023",
    description: "A digital art piece exploring the intersection of geometry and nature.",
    imageUrl: "https://th.bing.com/th/id/OIP.h-36wVnfm2dtutlT3MxxSAHaFj?rs=1&pid=ImgDetMain",
    price: "$200",
  },
  {
    id: 3,
    title: "Neon Lights",
    artist: "Alex Johnson",
    year: "2021",
    description: "A futuristic cityscape illuminated by glowing neon lights.",
    imageUrl: "https://th.bing.com/th/id/R.b74d95f1c02650ccd98257dfe84a7c4d?rik=%2fL7LF1wxNKkCUQ&pid=ImgRaw&r=0",
    price: "$250",
  },
];

const Artworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      setTimeout(() => {
        setArtworks(sampleArtworks);
        setLoading(false);
      }, 1000);
    };

    fetchArtworks();
  }, []);

  const handlePurchase = (title) => {
    alert(`Thank you for purchasing "${title}"!`);
  };

  const handleMouseEnter = (id) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.artworkPage}>
      <h1 style={styles.pageTitle}>Digital Artworks</h1>
      <div style={styles.artworkGrid}>
        {artworks.map((artwork) => (
          <div
            key={artwork.id}
            style={{
              ...styles.artworkCard,
              ...(hoveredCard === artwork.id ? styles.artworkCardHover : {}),
            }}
            onMouseEnter={() => handleMouseEnter(artwork.id)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              style={styles.artworkCardImage}
            />
            <div style={styles.artworkInfo}>
              <h3 style={styles.artworkInfoTitle}>{artwork.title}</h3>
              <p style={styles.artworkInfoText}><strong>Artist:</strong> {artwork.artist}</p>
              <p style={styles.artworkInfoText}><strong>Year:</strong> {artwork.year}</p>
              <p style={styles.artworkInfoText}><strong>Price:</strong> {artwork.price}</p>
              <p style={styles.artworkDescription}>{artwork.description}</p>
              <button
                style={styles.purchaseButton}
                onClick={() => handlePurchase(artwork.title)}
              >
                Purchase
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artworks;

// CSS styles (inline or can be imported as a separate file)
const styles = {
  artworkPage: {
    textAlign: 'center',
    padding: '40px 20px',
    backgroundColor: '#f7f7f7',
  },
  pageTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#4a7225',
  },
  artworkGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '40px',
    justifyItems: 'center',
    marginTop: '20px',
  },
  artworkCard: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '320px',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: '20px',
  },
  artworkCardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
  },
  artworkCardImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    objectFit: 'cover',
    marginBottom: '15px',
    transition: 'transform 0.3s ease-in-out',
  },
  artworkInfo: {
    paddingTop: '10px',
    textAlign: 'left',
    position: 'relative',
  },
  artworkInfoTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  artworkInfoText: {
    fontSize: '1rem',
    color: '#555',
    margin: '5px 0',
  },
  artworkDescription: {
    fontSize: '0.9rem',
    color: '#666',
    marginTop: '10px',
  },
  purchaseButton: {
    display: 'block',
    marginTop: '15px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
  purchaseButtonHover: {
    backgroundColor: '#45a049',
  },
  loading: {
    fontSize: '24px',
    color: '#333',
    textAlign: 'center',
  },
};
