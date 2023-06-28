import { ApiProperty } from '@nestjs/swagger';
import { Genre } from '@prisma/client';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsEnum,
  MinLength,
  MaxLength,
  ArrayNotEmpty,
  ArrayMinSize,
  ArrayMaxSize,
  ArrayUnique,
  IsDateString,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsEnum(Genre)
  genre: Genre;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  publisher: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  publishingDate: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(20)
  language: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  pages?: number;

  @ApiProperty()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ArrayUnique()
  authorsIds: number[];
}
