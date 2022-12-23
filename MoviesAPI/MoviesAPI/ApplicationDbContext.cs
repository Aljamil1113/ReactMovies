﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.Entities;
using System.Diagnostics.CodeAnalysis;

namespace MoviesAPI
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext([NotNullAttribute] DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MoviesActors>()
                .HasKey(x => new { x.ActorId, x.MovieId });

            modelBuilder.Entity<MoviesGenres>()
                .HasKey(x => new { x.GenreId, x.MovieId });

            modelBuilder.Entity<MovieTheaterMovies>()
                .HasKey(x => new { x.MovieTheaterId, x.MovieId });

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Genre> Genres { get; set; }
        public DbSet<Actor> Actors { get; set; }
        public DbSet<MovieTheater> MovieTheaters { get; set; }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<MoviesActors> MovieActors { get; set; }
        public DbSet<MoviesGenres> MovieGenres { get; set; }
        public DbSet<MovieTheaterMovies> MovieTheaterMovies { get; set; }
		public DbSet<Rating> Ratings { get; set; }
    }
}
