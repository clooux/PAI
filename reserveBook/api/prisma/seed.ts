import { Genre, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
// initialize Prisma Client
const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
  const passwordAdam = await bcrypt.hash('password', roundsOfHashing);
  const user1 = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      firstName: 'Adam',
      lastName: 'Walka',
      email: 'walka.adam@gmail.com',
      password: passwordAdam,
    },
  });

  const author1 = await prisma.author.upsert({
    where: { id: 1 },
    update: {},
    create: {
      firstName: 'Robert',
      lastName: 'Martin',
    },
  });

  const author2 = await prisma.author.upsert({
    where: { id: 2 },
    update: {},
    create: {
      firstName: 'David',
      lastName: 'Flanagan',
    },
  });

  const author3 = await prisma.author.upsert({
    where: { id: 3 },
    update: {},
    create: {
      firstName: 'Douglas',
      lastName: 'Crockford',
    },
  });

  const book1 = await prisma.book.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      description:
        'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn’t have to be that way.  Noted software expert Robert C. Martin, presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship. Martin, who has helped bring agile principles from a practitioner’s point of view to tens of thousands of programmers, has teamed up with his colleagues from Object Mentor to distill their best agile practice of cleaning code “on the fly” into a book that will instill within you the values of software craftsman, and make you a better programmer―but only if you work at it.  What kind of work will you be doing? You’ll be reading code―lots of code. And you will be challenged to think about what’s right about that code, and what’s wrong with it. More importantly you will be challenged to reassess your professional values and your commitment to your craft.    Clean Codeis divided into three parts. The first describes the principles, patterns, and practices of writing clean code. The second part consists of several case studies of increasing complexity. Each case study is an exercise in cleaning up code―of transforming a code base that has some problems into one that is sound and efficient. The third part is the payoff: a single chapter containing a list of heuristics and “smells” gathered while creating the case studies. The result is a knowledge base that describes the way we think when we write, read, and clean code.   Readers will come away from this book understanding How to tell the difference between good and bad code How to write good code and how to transform bad code into good code How to create good names, good functions, good objects, and good classes How to format code for maximum readability How to implement complete error handling without obscuring code logic How to unit test and practice test-driven development What “smells” and heuristics can help you identify bad code This book is a must for any developer, software engineer, project manager, team lead, or systems analyst with an interest in producing better code.',
      genre: Genre.Science,
      publisher: 'Pearson',
      publishingDate: new Date(2008, 8, 1),
      language: 'English',
      pages: 464,
      authors: {
        connect: { id: author1.id },
      },
    },
  });

  const book2 = await prisma.book.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title:
        'Javascript: The Definitive Guide: Master the Worlds Most-Used Programming Language',
      description:
        'JavaScript is the programming language of the web and is used by more software developers today than any other programming language. For nearly 25 years this best seller has been the go-to guide for JavaScript programmers. The seventh edition is fully updated to cover the 2020 version of JavaScript, and new chapters cover classes, modules, iterators, generators, Promises, async/await, and metaprogramming. Youll find illuminating and engaging example code throughout. This book is for programmers who want to learn JavaScript and for web developers who want to take their understanding and mastery to the next level. It begins by explaining the JavaScript language itself, in detail, from the bottom up. It then builds on that foundation to cover the web platform and Node.js.',
      genre: Genre.Science,
      publisher: 'OReilly',
      publishingDate: new Date(2020, 5, 13),
      language: 'English',
      pages: 687,
      authors: {
        connect: { id: author2.id },
      },
    },
  });

  const book3 = await prisma.book.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title:
        'JavaScript: The Good Parts: Working with the Shallow Grain of JavaScript',
      description:
        'Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined. This authoritative book scrapes away these bad features to reveal a subset of JavaScript thats more reliable, readable, and maintainable than the language as a whole―a subset you can use to create truly extensible and efficient code. Considered the JavaScript expert by many people in the development community, author Douglas Crockford identifies the abundance of good ideas that make JavaScript an outstanding object-oriented programming language-ideas such as functions, loose typing, dynamic objects, and an expressive object literal notation. Unfortunately, these good ideas are mixed in with bad and downright awful ideas, like a programming model based on global variables.',
      genre: Genre.Science,
      publisher: 'OReilly',
      publishingDate: new Date(2008, 5, 8),
      language: 'English',
      pages: 170,
      authors: {
        connect: { id: author3.id },
      },
    },
  });

  console.log({ author1, author2, author3, book1, book2, book3, user1 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
