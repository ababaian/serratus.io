import React from "react";

export default ( {pageNumber, setPageNumber, dataPromise} ) => {
  const [numPages, setNumPages] = React.useState();
  const [loading, setLoading] = React.useState(true);
  
  const visibleButton = "bg-gray-300 hover:bg-gray-500 mx-2 py-1 px-4 rounded inline-flex items-center";
  const invisibleButton = "invisible" + visibleButton;
  const centerButtons = "flex flex-row justify-center items-center";

  const nextPage = () => setPageNumber(pageNumber + 1);
  
  const prevPage = () => setPageNumber(pageNumber - 1);

  const readDataPromise = async (dataPromise) => {
    if (!dataPromise) return;
    dataPromise.then((data) => {
      data = data.numberOfPages;
      setLoading(false);
      setNumPages(data);
    })
  }

  React.useEffect(() => {
    if(!dataPromise) return;
    readDataPromise(dataPromise);
  }, [pageNumber, numPages, dataPromise]);

  return (
      (!loading && numPages !== 0) &&
      <div className={centerButtons}>
        {pageNumber === 1 ?
          <button className={invisibleButton}></button>
          : <button className={visibleButton} onClick={prevPage}>prev</button>
        }
            Page {pageNumber} out of {numPages}
        {pageNumber === numPages ?
          <button className={invisibleButton}></button>
          : <button className={visibleButton} onClick={nextPage}>next</button>
        }
      </div>
    )
}
