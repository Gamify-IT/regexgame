import { Quiz } from "./game";

export function quizData(): Quiz[] {
  const list: Quiz[] = [];
  //Very Easy for the Beginning

  list.push(new Quiz(new RegExp("hello"), "hello", "welcome", "hey :)"));
  list.push(new Quiz(new RegExp(".s"), "is", "the game", "easy"));
  list.push(new Quiz(new RegExp(".ha"), "aha", "haha", "ha"));
  list.push(new Quiz(new RegExp(".o."), "lol", "hello", "lo"));
  list.push(new Quiz(new RegExp(".a.a.a.a"), "hahahaha", "aaaa", "laalaa"));
  list.push(
    new Quiz(
      new RegExp("(type|java)(script)?"),
      "javascript",
      "script",
      "typejava"
    )
  );
  list.push(
    new Quiz(
      new RegExp('console.log(".+")'),
      'console.log("")',
      'console.log("Hello, world")',
      'consoleslog"test"'
    )
  );
  list.push(
    new Quiz(
      new RegExp("^[A-Z]+[a-z]+$"),
      "HellWorld",
      "HELLOworld",
      "helloworld"
    )
  );
  list.push(new Quiz(new RegExp("^[B-DF-HJ-NP-TV-Z]+$"), "HELLO", "TRY", "AI"));
  list.push(
    new Quiz(
      // eslint-disable-next-line no-control-regex
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
      "https://www.example.com/",
      "student@stud.uni-stuttgart.de",
      "console.log('Hello, world!')"
    )
  );

  return list;
}
