---
title: How We Inevitably Assembled Machine Learning - Series Introdution
date: 2025-01-06
author: Ishan Surana
category: blog
tags: [ml, dl, ai, guide, roadmap, info]
---

# How We Inevitably Assembled Machine Learning - Series Introdution

Most explanations of machine learning start after the most important decision has already been made.

They start with models, formulas, or algorithms, and quietly assume that you already agree with the idea that “learning from data” is the right way to solve problems. If you’re new, you’re asked to trust that this will make sense later. If you already have some experience, you’re expected not to question it.

I want to start earlier than that.

Before talking about machine learning at all, we need to talk about how people *normally* make computers solve problems, why that approach works so well at first, why it eventually stops working in a very specific and unavoidable way. And how all of this built up to the domain of machine learning that we see today.

So instead of explaining what this series will do, I’m going to start doing it immediately.

---

## Stage 0: When Writing Rules Stops Working

Let’s start with something familiar.

Imagine you are asked to build a very simple spam filter. You are not allowed to use machine learning. You can only write rules.

You might begin with something like this:

- If an email contains the word “free”, mark it as spam  
- If it contains “win money”, mark it as spam  
- If it comes from someone in your contacts, mark it as not spam  

This is a **rule-based system**. The computer is not discovering anything on its own. Every decision it makes is the result of conditions you wrote by hand.

At first, this feels reasonable. It even works for obvious cases.

Now you try to improve it.

You notice that some legitimate emails contain the word “free”, so you add an exception. Then you notice spam emails that avoid obvious keywords, so you add more rules. Then you notice emails that trigger both “safe” and “spammy” signals, so you start adding priorities and special cases.

Before long, your system is no longer a short list of rules. It is a growing structure of conditions, exceptions, and overrides, each one added for a sensible local reason.

Nothing here is careless. Nothing is obviously wrong.

But something uncomfortable starts happening.

---

## Watching the Failure, Not Just the Mess

As you keep extending the rule set, three things become impossible to ignore.

First, the number of rules grows much faster than the number of examples you are trying to handle. Each new condition doesn’t just add one more case to think about; it **multiplies the number of situations you now have to reason about**, because it can interact with every rule that already exists. What looked manageable at the start quietly becomes combinatorial.

Second, fixing one problem reliably creates another. A rule added to reduce false positives allows new spam through. A rule added to catch that spam starts blocking legitimate messages. You are no longer improving the system overall; you are redistributing mistakes.

Third, very small changes in the input cause sharp changes in output. Two emails that differ only slightly end up on opposite sides of the logic because one crossed a threshold or triggered a special case.

At this point, it is tempting to say the system is “messy” or “brittle”. But those words suggest that the problem is sloppiness or lack of care.

It isn’t.

Even if you were infinitely patient and willing to keep writing rules forever, you would still face a deeper problem: **you cannot know which distinctions matter until after the data surprises you**. The information you would need to write the right rules does not exist in advance.

This is no longer about effort. It is about doing the wrong kind of work.

---

## The Crucial Thing That Is *Not* Broken

Now pause and look at the data itself.

Even though your rules are struggling, the emails are not random. Messages that look similar often deserve similar treatment. Spam emails tend to share characteristics. Legitimate emails do too.

We say “similar-looking”, even though we do not yet know *what* aspects of an email actually matter. Is it the words? The sender? The structure? The timing? At this point, that uncertainty is unavoidable.

And that discomfort is important.

Because it tells us the problem is not the absence of patterns. The problem is that the patterns are **too complex, too varied, and too poorly understood to be written down explicitly as rules**.

This is the exact gap that machine learning is meant to address — but we are not filling it yet. Right now, we are only being honest about where the gap is.

---

## What Just Entered the Picture (Quietly but Permanently)

Without naming them yet, several assumptions have now entered the discussion:

- The data you see is only a small sample of a much larger space  
- Future inputs will not look exactly like past inputs  
- Similar cases should usually lead to similar decisions, even if we can’t yet say why  
- Writing more rules is not the same as improving behavior overall  

At the same time, something else has happened that is easy to overlook.

By admitting that you cannot write all the rules, you have given up things that rule-based systems normally provide:

- full control over behavior  
- clean, human-readable explanations for every decision  
- certainty about why a particular outcome occurred  

This is not just a technical shift. It is a psychological one. Moving beyond rules means accepting that some decisions will no longer have simple, explicit explanations.

That loss matters, and it will come back later.

---

## Where This Leaves Us

We have reached a boundary that cannot be crossed by writing better rules.

We cannot keep enumerating cases.  
We cannot keep anticipating exceptions.  
But we also cannot say the problem has no structure.

We know patterns exist.  
We know rules cannot capture them at scale.  
And we do not yet know what should replace those rules.

That unresolved tension is not philosophical. It is practical.

The only question left is:

**If we cannot write the rules, what *can* we write instead?**

Answering that question is the real beginning of machine learning.

That is where this series will go next.

---

## Where This Series Is Going (The Roadmap)

This series reconstructs machine learning as it actually emerged. Not as a clean theory, but as a sequence of increasingly strained ideas, each introduced because the previous one could not handle the problem anymore.

Each stage below represents a **conceptual plateau**. Inside a stage, many models appear. But between stages, something breaks.

---

- **Stage 0: When Writing Rules Stops Working**  

  We begin with explicit logic because that is how humans naturally encode decisions.
  This stage ends when it becomes clear that no amount of care or foresight lets us know in advance which distinctions will matter.
  The failure is not effort, but epistemic.



- **Stage 1: From Decisions to Measurements**  

  When rules fail, the first instinct is not learning, but measurement. Instead of saying what to do, we ask how much a signal is present. Numbers enter because they allow comparison without commitment. This stage exists before models, training, or automation.



- **Stage 2: Linear Models as the First Structured Guess**  

  Once signals are numeric, the next natural idea is to combine them. Linear models appear not because they are powerful, but because they are the simplest way to relate many measurements to one outcome. This is the first time we have an explicit model, even if we do not yet call it that.



- **Stage 3: Learning Parameters Instead of Setting Them**  

  Manually choosing weights does not scale. This stage introduces the idea that parameters should change when the system is wrong. The question becomes not “what is the rule?” but “how should this change after an error?”



- **Stage 4: Error, Loss and the Bias–Variance Tension**  

  Once systems adjust themselves, we must decide what kind of mistakes matter. Compressing performance into a single quantity feels necessary, but it introduces trade-offs. This stage formalizes the idea that improving one failure mode often worsens another.



- **Stage 5: When Linearity Fails**  

  Real data rarely aligns with straight boundaries. Linear models fail not because they are trained poorly, but because their shape is too simple. This stage forces the question of how to keep learning while escaping linear geometry.



- **Stage 6: Generalized Linear Models and Soft Decisions**  

  Instead of abandoning linear structure entirely, we wrap it. Applying a function on top of a linear combination allows smoother transitions and soft decisions. This stage bridges regression and classification without fully leaving linear thinking.



- **Stage 7: Instance-Based Reasoning and Similarity**  

  When global models struggle, a simpler intuition resurfaces. Treat new cases like similar past cases. This works surprisingly well and fails just as reliably when similarity becomes ambiguous.



- **Stage 8: Explicit Partitioning of the Input Space**  

  If smooth functions fail, perhaps the space should be cut into regions. Trees return us to structure, but learned rather than written. This stage makes clear how expressive discrete structure can be, and how fragile it is.



- **Stage 9: Variance, Instability and Ensembles**  

  Small changes in data cause large changes in learned structure. The response is not to find a perfect model, but to average imperfect ones. Stability becomes an emergent property, not a design feature.



- **Stage 10: Maximum Margin and High-Dimensional Separation**  

  Instead of explicitly engineering complexity, we embed the data into richer spaces. Separation becomes easier, but intuition becomes harder. This stage shows how geometry can substitute for explicit representation learning.



- **Stage 11: Unsupervised Structure and Compression**  

  Not all structure comes from labels. This stage explores what can be learned when the task itself is undefined. Compression, grouping, and variance become the guiding signals.



- **Stage 12: Neural Networks as Composed Linear Models**  

  Neural networks begin as a simple idea. Stack linear transformations with nonlinear thresholds. This stage reframes neural networks as function composition, not biology.



- **Stage 13: Backpropagation and Deep Optimization**  

  Once models have layers, learning becomes a coordination problem. Backpropagation emerges as a systematic way to assign blame and adjust parameters. This stage explains depth as a training challenge, not just a representational one.



- **Stage 14: Depth, Expressivity, and Regularization**  

  More layers mean more expressive power and more ways to fail. This stage introduces techniques that exist purely to keep deep models trainable.



- **Stage 15: Specialized Architectures for Structure**  

  Some data has structure that generic models ignore. Images have locality. Sequences have order. Architecture becomes a way to encode assumptions directly into the model.



- **Stage 16: Generative Modeling and Latent Structure**  

  Prediction is no longer enough. We want to model the data itself. Neural networks become universal approximators inside larger probabilistic systems.



- **Stage 17: Diffusion, World Models, and Modern Generative Systems**

  Generation becomes iterative and structured. These models arise not from new philosophy, but from fixing failures of earlier generators.



- **Stage 18: Attention and Transformers**  

  Sequential models struggle with long-range dependency and relevance. Attention reframes sequence processing by asking what matters, not just what comes next.



- **Stage 19: Scaling, Training Practice, and Systems Reality**  

  At scale, theory gives way to engineering constraints. Training itself becomes a system-level problem.



- **Stage 20: Deployment, Drift, and MLOps**  

  Models do not live in isolation. The final stage has no resolution, only maintenance under change.

---

This roadmap is long because the field actually is. Machine learning is not one idea; it is an accumulation of compromises, each justified by the failure before it.
