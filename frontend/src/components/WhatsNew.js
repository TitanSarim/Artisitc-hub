import React, { useState, useEffect } from 'react';

const sampleWhatsNew = [
  {
    id: 1,
    title: 'New Artwork by Sarah Johnson',
    artist: 'Sarah Johnson',
    description: 'Explore the latest collection of surreal digital art by Sarah Johnson, blending technology and creativity.',
    imageUrl: 'https://th.bing.com/th/id/OIP.Wm_UxK_R4SX4i9U4l7-y_AHaFW?rs=1&pid=ImgDetMain',
    date: '2024-12-25',
  },
  {
    id: 2,
    title: 'Virtual Reality Art Exhibition',
    artist: 'Various Artists',
    description: 'A new exhibition showcases art through virtual reality. Experience immersive digital installations and interactive displays.',
    imageUrl: 'https://th.bing.com/th/id/OIP.h-36wVnfm2dtutlT3MxxSAHaFj?rs=1&pid=ImgDetMain',
    date: '2024-12-28',
  },
  {
    id: 3,
    title: 'Gallery Update: Contemporary Art Collection',
    artist: 'Various Artists',
    description: 'New arrivals in the contemporary art collection. Discover cutting-edge pieces from the top emerging artists.',
    imageUrl: 'https://th.bing.com/th/id/R.da15ffca2d2dcba1dc632cd1eca9512f?rik=zMo3V4DEA24%2bBA&riu=http%3a%2f%2ffantasyartdesign.com%2f3dgallery%2fa-digital%2f3D-images%2f02artist3d-dracelot%2fdigital-fantasy04.jpg&ehk=Ci%2b8juiRdv%2fi%2flzOS6VllT2ubeLDoOn0%2fyPtqYyoVJ0%3d&risl=&pid=ImgRaw&r=0',
    date: '2024-12-29',
  },
];

const WhatsNew = () => {
  const [whatsNew, setWhatsNew] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWhatsNew = async () => {
      // Simulating a delay for API call or fetching real data
      setTimeout(() => {
        setWhatsNew(sampleWhatsNew);
        setLoading(false);
      }, 1000);
    };

    fetchWhatsNew();
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading latest updates...</div>;
  }

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.pageTitle}>What's New in Art</h1>
      <div style={styles.newUpdatesGrid}>
        {whatsNew.map((update) => (
          <div key={update.id} style={styles.updateCard}>
            <img src={update.imageUrl} alt={update.title} style={styles.updateImage} />
            <div style={styles.updateInfo}>
              <h3 style={styles.updateTitle}>{update.title}</h3>
              <p style={styles.updateArtist}><strong>Artist:</strong> {update.artist}</p>
              <p style={styles.updateDescription}>{update.description}</p>
              <p style={styles.updateDate}><strong>Date:</strong> {update.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatsNew;

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
  newUpdatesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    justifyItems: 'center',
    marginTop: '20px',
  },
  updateCard: {
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
  updateImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    objectFit: 'cover',
    marginBottom: '15px',
    transition: 'transform 0.3s ease-in-out',
  },
  updateCardHover: {
    transform: 'scale(1.05)',
  },
  updateInfo: {
    paddingTop: '10px',
    textAlign: 'left',
  },
  updateTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  updateArtist: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '5px',
  },
  updateDescription: {
    fontSize: '1rem',
    color: '#777',
    marginBottom: '10px',
  },
  updateDate: {
    fontSize: '0.9rem',
    color: '#999',
    marginTop: '10px',
  },
  loading: {
    fontSize: '24px',
    color: '#333',
    textAlign: 'center',
  },
};
