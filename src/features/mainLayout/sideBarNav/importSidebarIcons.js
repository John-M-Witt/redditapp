function importSidebarIcons(r) {
  let images = {};
  const baseUrl = 'https://www.reddit.com/r/';
  
    r.keys().map((item) => {
      console.log(item);
      const fileName = item.replace('./', '').replace(/\.[^/.]+$/, ''); // Remove './' and the file extension
      const fileNameNoSpace = fileName.replace(/\s+/g, "")
      images[fileName] = {
        path: r(item),
        title: fileName.replace(/-/g, ' '), // Replace hyphens with spaces for the title
        url: baseUrl+fileNameNoSpace
        };
        });
    return images;
  }

const sidebarIcons = importSidebarIcons(require.context('../../../assets/images/subReddits', false, /\.(png|jpe?g|svg)$/));

console.log(sidebarIcons);


export default sidebarIcons; 

