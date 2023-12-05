export const FormSearchProducts = () => {

  return (
    <form action="" className="d-flex align-items-center" >
        <label htmlFor="">Buscar: </label>
        <div className="input-group mb-3">
        <input type="text" className="form-control ml-3" name="keyword"/>
        <div className="input-group-append" style={{cursor: 'pointer'}}>
            <button type="submit" className="input-group-text" id="basic-addon2"> <i className="fa fa-search"></i>  </button>
        </div>
        </div>

    </form>
  )
}
