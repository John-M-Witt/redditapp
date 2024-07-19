function importSidebarIcons(r) {
    let images = {};
  
    r.keys().map((item, index) => {
      const fileName = item.replace('./', '').replace(/\.[^/.]+$/, ''); // Remove './' and the file extension
      images[fileName] = {
        path: r(item),
        fullTitle: item,
        title: fileName.replace(/-/g, ' ') // Replace hyphens with spaces for the title
      };
    });
  
    return images;
  }

const sidebarIcons = importSidebarIcons(require.context('../../../assets/images/subReddits', false, /\.(png|jpe?g|svg)$/));

export default sidebarIcons; 

