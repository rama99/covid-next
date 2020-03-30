import {useState , Fragment} from  'react';
import fetch from 'node-fetch';
import styled from 'styled-components'
import Country from '../component/country/country';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 5% 25% 70%;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 50% 10% 40%;
  }
`

const Index = ({countries}) => {

    const [slug,setData] = useState(`india`);
  
    const onCountrySelect = (e) => {        
        //this.props.fetchByCountryAsync(e.target.value);
        setData(e.target.value);
        //console.log(data);
    }

    return (
            <Fragment>

             

<nav className="navbar navbar-light bg-light">
  <form className="form-inline">     
  <select className="form-control mr-sm-2" onChange={(e) => onCountrySelect(e)}>
                                        {
                                            countries.map(c => {

                                            if(c.Country.length > 0) {
                                                if(c.Country === `India`) {
                                                    return (<option key={c.Country} value={c.Slug} selected>{c.Country}</option>)
                                                }
                                                else {
                                                    return (<option key={c.Country} value={c.Slug}>{c.Country}</option>)
                                                }                                 
                                            }                               
                                            })                               
                                        }   
    </select>    
  </form>
</nav>
                    <div className="container">  
                        <Country slug={slug}/>                                         
                    </div>
            </Fragment>        
    )

}

export async function getStaticProps(context) {

    const res = await fetch('https://api.covid19api.com/countries');
    const countries = await res.json();

    return {
      props: {
          countries
      }, // will be passed to the page component as props
    }
  }

export default Index;