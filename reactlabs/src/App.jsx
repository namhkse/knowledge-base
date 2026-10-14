import { useEffect, useMemo, useRef, useState } from "react";

function isPrime(n) {
  const max = Math.ceil(Math.sqrt(n));

  if (n === 2) {
    return true;
  }

  for (let counter = 2; counter <= max; counter++) {
    if (n % counter === 0) {
      return false;
    }
  }

  return true;
}

export default function App(params) {
  const [count, setCount] = useState(0)
  const [foobar, setFoobar] = useState('foo')

  return(
    <>
      <button onClick={() => setCount(prev => prev + 1)}>count: {count}</button>
      <Foo foobar={foobar} onClick={handleClick}/>
    </>
  ) 
}

function Foo({foobar, onClick}) {
  console.log('foo renders');
  
  return (
    <button onClick={onClick}>{foobar}</button>
  ) 
}

function PrimeCalculator() {
  const [selectedNum, setSelectedNum] = useState(100);
  const allPrimes = useMemo(() => {
    const result = [];

    for (let i = 2; i < selectedNum; i++) {
      if (isPrime(i)) {
        result.push(i);
      }
    }

    return result;
  }, [selectedNum]);

  return (
    <>
      <form>
        <input
          type="number"
          value={selectedNum}
          onChange={(e) => setSelectedNum(e.target.value)}
        />
      </form>
      <p>
        There are {allPrimes.length} prime(s) between 1 and {selectedNum}:{" "}
        {allPrimes.join(", ")}
      </p>
    </>
  );
}

function Clock() {
  const time = useTime();
  return <p>Time: {time.toString()}</p>;
}

function useTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return time;
}
