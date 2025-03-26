// Add these styles to your page component
// ... at the bottom of the file, before any closing tags

<style jsx global>{`
  @media (max-width: 768px) {
    .drawer-container {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 50;
    }

    .drawer-content {
      max-height: 80vh;
      overflow-y: auto;
    }

    .results-container {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      padding: 1rem;
      gap: 1rem;
    }

    .result-item {
      scroll-snap-align: start;
      flex: 0 0 auto;
      width: 280px;
    }
  }
`}</style>;
