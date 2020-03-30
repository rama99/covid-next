import {Fragment} from 'react';
import useSWR from 'swr';
import { Spinner } from 'reactstrap';

function fetcher(url) {
    return fetch(url).then(r => r.json());
  }

  function formatDate(date) {
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 101).toString().substring(1);
    var day = (date.getDate() + 100).toString().substring(1);
    return day + "-" + month + "-" + year ;
}

const Country = ({slug}) => {

    const { data, error } = useSWR(`https://api.covid19api.com/total/country/${slug}/status/confirmed`, fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return (
        <Fragment>
        <div class="spinner-border" role="status">            
            <span class="sr-only">Loading...</span>
        </div>
        </Fragment>
      )
    return (
        <Fragment>  


<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Cases</th>      
    </tr>
  </thead>
  <tbody>
     
    {
                        data.slice(0).reverse().map(c => {

                          let date = new Date( Date.parse(c.Date) );
                           return (                                    
                            <tr>                            
                            <td>{formatDate(date)}</td>
                            <td>{c.Cases}</td>                           
                          </tr>
                                  )
                        })
    }   
  </tbody>
</table>
        </Fragment>            
    )

}
export default Country;