//Adds commas for numbers > 1,000
export function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Calculate post date and time created using UNIX timestamp
export function timeSincePost (unixTimeStamp) {
    const postDate = new Date(unixTimeStamp * 1000);
    const currentDate = new Date();  
    const millisecondsSincePost = currentDate - postDate;

    const minutesSincePosted = Math.round(millisecondsSincePost/(1000*60));
    //console.log(`Rounded minutes since posted: ${minutesSincePosted} `);

    const hoursSincePosted = Math.round(millisecondsSincePost/(1000*60*60));
    //console.log(`Hours since posted: ${hoursSincePosted} `);

    const daysSincePosted = Math.round(millisecondsSincePost/(1000*60*60*24));
    //console.log(`Days since posted: ${daysSincePosted} `);

    const yearsSincePosted = Math.round((millisecondsSincePost/(1000*60*60*24*365)));  
    //console.log(`Years since posted: ${yearsSincePosted} `);

    if (minutesSincePosted === 1) {
        return `Posted ${minutesSincePosted} minute ago`;
    } else if (minutesSincePosted > 1 && minutesSincePosted < 60) {
        return `Posted ${minutesSincePosted} minutes ago`;
    } else if (minutesSincePosted === 60) {
        return `Posted ${hoursSincePosted} hour ago`;
    } else if (minutesSincePosted > 60 && minutesSincePosted < (60*24)) {
        return `Posted ${hoursSincePosted} hours ago`;
    } else if(minutesSincePosted === (60*24)){
        return `Posted ${daysSincePosted} day ago`;
    } else if(minutesSincePosted > (60*24) && minutesSincePosted < (60*24*365)){  // Min > Greater than 24 hours and less than or equal to 1 year 
        return `Posted ${daysSincePosted} days ago`; 
    } else if(minutesSincePosted === (60*24*365)){
        return `Posted ${yearsSincePosted} year ago`; 
    } else {
        return `Posted ${yearsSincePosted} years ago`;
    } 
}

//Converts multi-term searches to the required format by adding %20 after each word except for the final word
export const formatSearchPhrase = (searchInput = null) => {
    const lowerCaseSearchTerm = searchInput.toLowerCase();
    const searchTermArray = lowerCaseSearchTerm.split(' '); 
    const searchTermArrayNoSpaces = searchTermArray.map(term => term.trim()).filter(item => item !== ""); //Removes spaces that would be otherwise be counted as words
   
    const numberOfSearchTerms = searchTermArrayNoSpaces.length; 
    
    if(numberOfSearchTerms > 1 ){
        const lastSearchTerm = searchTermArrayNoSpaces[(searchTermArrayNoSpaces.length-1)]
        let formattedSearchTerms = [ ];
        for (let i=0 ; i < searchTermArrayNoSpaces.length-1; i++) {
        formattedSearchTerms.push((searchTermArrayNoSpaces[i] + '%20'));
        }
        formattedSearchTerms.push(lastSearchTerm);
        const multiTermSearch = formattedSearchTerms.join('');
        return multiTermSearch;
        
    } else {
        return searchInput;
    }
};

// Creates a reusable matchMedia mock function, which returns a MediaQueryList object.  

export const createMatchMedia = (matches) => {
    return jest.fn().mockImplementation((query) => ({
        matches,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    }));
};

export const getMediaQueryMatches = (query) => {
    return window.matchMedia(query).matches;
};



