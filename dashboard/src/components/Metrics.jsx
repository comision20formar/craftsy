import { MetricItem } from './MetricItem';

const data = [
    {
      id: crypto.randomUUID(),
      color: "primary",
      title: "Productos en almacen",
      value: 21,
      icon: "fa-film",
    },
    {
      id: crypto.randomUUID(),
      color: "success",
      title: "Clientes registrados",
      value: 79,
      icon: "fa-award",
    },
    {
      id: crypto.randomUUID(),
      color: "warning",
      title: "Marcas comercializadas",
      value: 49,
      icon: "fa-user",
    },
  ];
  

export const Metrics = () => {
  return (
    <div className="col-12">
      <div className="row">
        {data.map(({ color, title, value, icon, id }) => (
          <MetricItem
            key={id}
            color={color}
            title={title}
            value={value}
            icon={icon}
          />
        ))}
      </div>
    </div>
  )
}
