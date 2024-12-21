
import { getAllTechnicians, getTechniciansStats } from '@/actions';
import { redirect } from 'next/navigation';
import { BsEmojiDizzy } from 'react-icons/bs';
import { FaCheck, FaClipboardCheck } from 'react-icons/fa';
import { formatNumber } from '@/util';

export default async function NamePage () {
  
  const technicians = await getAllTechnicians();
  const stats = await getTechniciansStats();

  if (!technicians || technicians.length < 1){
    redirect('/not-found');
  }
  
  return (
    <div>
      <table>
        <thead> 
          <tr>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th>Promedio</th>
            <th>Trabajos</th>
            <th>Antecedentes</th>
          </tr>
        </thead>
        <tbody>
          {
            technicians &&
            technicians.map(technician => {
              const technicianStats = stats[technician.id] || { average: 0.0, quantity: 0 };
              return <tr key={technician.id}>
                <td>{technician.last_name.toUpperCase()}, {technician.first_name}</td>
                <td>{technician.dni}</td>
                <td>{technician.phone}</td>
                <td>{formatNumber(technicianStats.average, 2)}</td>
                <td>{formatNumber(technicianStats.quantity, 0)}</td>
                <td>{ technician.criminal_records ? <FaCheck /> : <BsEmojiDizzy /> }</td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
}