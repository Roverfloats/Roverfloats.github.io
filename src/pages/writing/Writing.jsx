import Header from '../../components/Header';
import WritingOverview from '../../Components/writing/WritingOverview';

function Writing() {
  var colors = JSON.parse(localStorage.getItem("colors"))

  return (
    <>
        <Header/>
        <div className='px-[50px]'>
          <WritingOverview/>
        </div>
    </>

  )
}

export default Writing
