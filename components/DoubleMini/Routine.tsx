import React from 'react';
import DoubleMiniRoutineWithElements from '../../types/doubleMiniRoutine';

interface RoutineProps {
  routine: DoubleMiniRoutineWithElements;
}

const Routine = ({ routine }: RoutineProps) => (
  <>
    <h3>
      Serie
      {routine.order}
    </h3>
    <table key={routine.id}>
      <thead>
        <tr>
          <th>#</th>
          <th>Sprong</th>
          <th>FIG code</th>
          <th>Moeilijkheidsgraad</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mount</td>
          <td>{routine.mount?.name}</td>
          <td>{routine.mount?.figCode}</td>
          <td>{routine.mount?.difficulty}</td>
        </tr>
        <tr>
          <td>Spotter</td>
          <td>{routine.spotter?.name}</td>
          <td>{routine.spotter?.figCode}</td>
          <td>{routine.spotter?.difficulty}</td>
        </tr>
        <tr>
          <td>Dismount</td>
          <td>{routine.dismount?.name}</td>
          <td>{routine.dismount?.figCode}</td>
          <td>{routine.dismount?.difficulty}</td>
        </tr>
      </tbody>
    </table>
    <br />
  </>
);

export default Routine;
