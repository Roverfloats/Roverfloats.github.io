import Header from '../../components/Header';
import WorldbuildingOverview from '../../components/writing/WorldbuildingOverview';

function Writing({allowSensitive}) {

  return (
    <>
        <Header allowSensitive={allowSensitive}/>
        <div className="w-full h-auto px-[50px]">
          <WorldbuildingOverview/>
        </div>
    </>

  )
}

export default Writing
