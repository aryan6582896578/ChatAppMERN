import { useEffect, useState } from 'react';
import { Outlet,Navigate } from 'react-router';


export default function Something({somedata}) {
somedata=somedata?somedata:"ff"


  return (
  < >
<h1 className={`text-orange-500 font-bold ${somedata}  `}>something  </h1>
{somedata}
<Outlet />
  </>
  );
}

