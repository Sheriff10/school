const colorConfig = (status) => {
    switch (status) {
       case "pending":
          return <span className="text-white badge bg-pri">{status}</span>;
       case "ongoing":
          return (
             <span className="text-black badge bg-yellow-400">{status}</span>
          );
       case "completed":
          return (
             <span className="text-white badge bg-green-600">{status}</span>
          );
          case "canceled":
          return (
             <span className="text-white badge bg-red-600">{status}</span>
          );
    }
 };

 export default colorConfig